"use client";

import type { PortfolioFormValues } from "@/lib/validations/portfolio";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getThemeById } from "@/features/themes/registry";
import {
  AlertCircleIcon,
  BriefcaseIcon,
  CheckIcon,
  CopyIcon,
  EyeIcon,
  GraduationCapIcon,
  LinkIcon,
  PaintbrushIcon,
  RocketIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { usePortfolioData } from "@/features/portfolios/hooks/usePortfolioData";
import { toast } from "sonner";
import { updatePortfolio } from "@/actions/portfolios/actions";
import { checkDomain, updateTenant } from "@/actions/tenants/actions";
import * as z from "zod";
import { debounce } from "lodash";

// Domain validation schema
const domainSchema = z.object({
  subdomain: z
    .string()
    .trim()
    .min(3, "Subdomain must be at least 3 characters")
    .max(63, "Subdomain must be less than 63 characters")
    .regex(
      /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/,
      "Subdomain can only contain lowercase letters, numbers, and hyphens. It cannot start or end with a hyphen."
    )
    .optional()
    .nullable(),
  customDomain: z
    .string()
    .trim()
    .regex(
      /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/,
      "Please enter a valid domain name (e.g., example.com)"
    )
    .optional()
    .nullable(),
});

type PublishStepProps = {
  preview?: boolean;
  portfolioId?: number;
  tenantId: number;
  subdomain?: string;
  domain?: string;
};

export default function PublishStep({
  preview,
  portfolioId,
  tenantId,
  subdomain,
  domain,
}: PublishStepProps) {
  const form = useFormContext<PortfolioFormValues>();
  const [publishEnabled, setPublishEnabled] = useState(
    form.getValues().portfolio.is_published
  );
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [activeUrlTab, setActiveUrlTab] = useState<string>("subdomain");

  // Extract the user-input part from the full subdomain
  const initialUserInputSubdomain = subdomain
    ? subdomain.replace(`.${process.env.NEXT_PUBLIC_DOMAIN}`, "")
    : "";

  // Domain state
  const [userInputSubdomain, setUserInputSubdomain] = useState<string>(
    initialUserInputSubdomain
  );
  const [customDomain, setCustomDomain] = useState<string>(domain || "");
  const [isUpdatingDomain, setIsUpdatingDomain] = useState(false);
  const [isValidatingSubdomain, setIsValidatingSubdomain] = useState(false);
  const [isValidatingCustomDomain, setIsValidatingCustomDomain] =
    useState(false);
  const [subdomainError, setSubdomainError] = useState<string | null>(null);
  const [customDomainError, setCustomDomainError] = useState<string | null>(
    null
  );

  // Get current form data for preview
  const { portfolio, experiences, projects, socials, skills, educations } =
    usePortfolioData(form);

  // Get selected theme for preview
  const selectedThemeId = form.getValues().options?.theme || "minimal";
  const selectedTheme = getThemeById(selectedThemeId as any);
  const ThemeComponent = selectedTheme?.component;

  // Get color theme information
  const colorTheme = form.getValues().options?.colorTheme || "light";
  const font = form.getValues().options?.font || "inter";

  const fullSubdomain = userInputSubdomain
    ? `${userInputSubdomain}.${process.env.NEXT_PUBLIC_DOMAIN}`
    : null;

  // Effect to automatically open the preview if preview prop is true
  useEffect(() => {
    if (preview) {
      setIsPreviewOpen(true);
    }
  }, [preview]);

  // Fetch tenant data to get existing domain settings
  useEffect(() => {
    const fetchTenantData = async () => {
      if (!tenantId) return;

      try {
        // Get values from portfolio schema if they exist
        const portfolioValues = form.getValues().portfolio;
        const initialFullSubdomain = portfolioValues.subdomain || "";
        const initialCustomDomain = portfolioValues.custom_domain || "";

        // Extract user input part from full subdomain
        const initialUserInput = initialFullSubdomain
          ? initialFullSubdomain.replace(
              `.${process.env.NEXT_PUBLIC_DOMAIN}`,
              ""
            )
          : "";

        // Set initial values for state
        setUserInputSubdomain(initialUserInput);
        setCustomDomain(initialCustomDomain);

        // Validate initial values if present
        if (initialUserInput) {
          validateSubdomain(initialUserInput);
        }

        if (initialCustomDomain) {
          validateCustomDomain(initialCustomDomain);
        }
      } catch (error) {
        console.error("Error fetching domain data:", error);
      }
    };

    fetchTenantData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tenantId, form.getValues /* Re-run if form values change externally */]);

  const updatePublishState = async (checked: boolean) => {
    setPublishEnabled(checked);
    form.setValue("portfolio.is_published", checked, {
      shouldDirty: true,
      shouldValidate: true,
    });

    // Directly save changes when toggle is changed
    if (portfolioId) {
      try {
        const { error } = await updatePortfolio({
          id: portfolioId,
          is_published: checked,
        });

        if (error) {
          throw new Error(`Failed to update publish status: ${error.message}`);
        }

        toast.success(
          checked
            ? "Portfolio is now published"
            : "Portfolio is now unpublished"
        );

        // Reset form to mark as clean
        const formValues = form.getValues();
        form.reset(formValues);
      } catch (error) {
        console.error("Error updating publish status:", error);
        toast.error("Failed to update publish status");

        // Revert the toggle if there was an error
        setPublishEnabled(!checked);
        form.setValue("portfolio.is_published", !checked, {
          shouldDirty: true,
        });
      }
    }
  };

  // Handle preview opening
  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  // Handle URL copying based on active tab
  const handleCopyUrl = () => {
    if (!portfolioId) return;

    let url = "";

    switch (activeUrlTab) {
      case "subdomain":
        if (fullSubdomain && !subdomainError) {
          url = `https://${fullSubdomain}`;
        } else {
          toast.error("No valid subdomain configured");
          return;
        }
        break;
      case "custom":
        if (customDomain && !customDomainError) {
          url = `https://${customDomain}`;
        } else {
          toast.error("No valid custom domain configured");
          return;
        }
        break;
    }

    if (url) {
      navigator.clipboard.writeText(url);
      setIsCopied(true);
      toast.success("Portfolio URL copied to clipboard");

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  const validateSubdomain = (value: string): boolean => {
    try {
      domainSchema.shape.subdomain.parse(value);
      setSubdomainError(null);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setSubdomainError(error.errors[0]?.message || "Invalid subdomain");
      }
      return false;
    }
  };

  const validateCustomDomain = async (value: string): Promise<boolean> => {
    try {
      domainSchema.shape.customDomain.parse(value);
      setCustomDomainError(null);
      const { data: isDomainExist } = await checkDomain(value);
      console.log(isDomainExist?.id, tenantId);
      if (isDomainExist && isDomainExist.id !== tenantId) {
        setCustomDomainError("This domain is already taken");
        return false;
      }
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setCustomDomainError(error.errors[0]?.message || "Invalid domain");
      }
      return false;
    }
  };

  // Debounced validation for subdomain user input
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSubdomainValidation = useCallback(
    debounce(async (value: string) => {
      setIsValidatingSubdomain(true);
      const constructedFullSubdomain = value
        ? `${value}.${process.env.NEXT_PUBLIC_DOMAIN}`
        : null;

      try {
        // TODO: Add API call to check if subdomain is available (using constructedFullSubdomain)
        // Example:
        // if (constructedFullSubdomain) {
        //   const { available } = await checkSubdomainAvailability(constructedFullSubdomain);
        //   if (!available) {
        //     setSubdomainError("This subdomain is already taken");
        //     setIsValidatingSubdomain(false);
        //     return false;
        //   }
        // }

        const isValid = validateSubdomain(value); // Validate only the user input part

        if (isValid) {
          // Update form value with the *full* subdomain
          form.setValue("portfolio.subdomain", constructedFullSubdomain, {
            shouldDirty: true,
            shouldValidate: true, // Trigger RHF validation if needed
          });
        } else {
          // Clear form value if validation fails
          form.setValue("portfolio.subdomain", null, {
            shouldDirty: true,
            shouldValidate: true,
          });
        }

        return isValid;
      } catch (error) {
        console.error("Error validating subdomain:", error);
        setSubdomainError("Error validating subdomain");
        // Clear form value on error
        form.setValue("portfolio.subdomain", null, {
          shouldDirty: true,
          shouldValidate: true,
        });
        return false;
      } finally {
        setIsValidatingSubdomain(false);
      }
    }, 500),
    [form] // Add form dependency
  );

  // Debounced validation for custom domain
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedCustomDomainValidation = useCallback(
    debounce(async (value: string) => {
      setIsValidatingCustomDomain(true);

      try {
        // TODO: Add API call to validate custom domain
        // const { valid } = await validateCustomDomainAPI(value);
        // if (!valid) {
        //   setCustomDomainError("This domain cannot be verified");
        //   return false;
        // }

        const isValid = await validateCustomDomain(value);

        if (isValid) {
          // Update form values
          form.setValue("portfolio.custom_domain", value, {
            shouldDirty: true,
            shouldValidate: true,
          });
        }

        return isValid;
      } catch (error) {
        console.error("Error validating custom domain:", error);
        setCustomDomainError("Error validating domain");
        return false;
      } finally {
        setIsValidatingCustomDomain(false);
      }
    }, 500),
    []
  );

  const handleSubdomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setUserInputSubdomain(value); // Store only the user input part
    setIsValidatingSubdomain(true);
    setSubdomainError(null); // Clear previous errors on new input
    debouncedSubdomainValidation(value);
  };

  const handleCustomDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setCustomDomain(value);
    setIsValidatingCustomDomain(true);
    debouncedCustomDomainValidation(value);
  };

  const saveDomainSettings = async () => {
    if (!tenantId) {
      toast.error("Tenant ID is required");
      return;
    }

    setIsUpdatingDomain(true); // Start loading indicator early

    try {
      // Ensure debounced validations complete before checking states
      if (userInputSubdomain) {
        await debouncedSubdomainValidation.flush();
      }
      if (customDomain) {
        await debouncedCustomDomainValidation.flush();
      }

      // Wait briefly for potential state updates triggered by flush
      // This helps mitigate timing issues with async state updates
      await new Promise((resolve) => setTimeout(resolve, 150));

      // Now check the error states populated by the validators
      if (subdomainError || customDomainError) {
        if (subdomainError) {
          toast.error(`Subdomain error: ${subdomainError}`);
        } else if (customDomainError) {
          // Use the specific error message from the state
          toast.error(`Custom domain error: ${customDomainError}`);
        }
        setIsUpdatingDomain(false); // Stop loading indicator
        return; // Stop execution
      }

      // Proceed with saving if no errors in state
      const finalFullSubdomain = userInputSubdomain
        ? `${userInputSubdomain}.${process.env.NEXT_PUBLIC_DOMAIN}`
        : null;
      const finalCustomDomain = customDomain || null;

      // Ensure at least one domain is set if required by application logic
      // (Add this check if necessary based on your requirements)
      // if (!finalFullSubdomain && !finalCustomDomain) {
      //   toast.error("Please configure either a subdomain or a custom domain.");
      //   setIsUpdatingDomain(false);
      //   return;
      // }

      if (portfolioId) {
        // Explicitly set the final values in the form state before saving
        form.setValue("portfolio.subdomain", finalFullSubdomain, {
          shouldDirty: true,
        });
        form.setValue("portfolio.custom_domain", finalCustomDomain, {
          shouldDirty: true,
        });

        // Update tenant data with final values
        const { error } = await updateTenant(tenantId, {
          subdomain: finalFullSubdomain,
          custom_domain: finalCustomDomain,
        });

        if (error) {
          throw new Error(`Failed to update domain settings: ${error.message}`);
        }

        // Reset the form with the latest values to mark as clean
        const formData = form.getValues();
        form.reset({ ...formData }); // Ensure form state reflects saved state

        toast.success("Domain settings updated successfully");
      } else {
        // Handle case where portfolioId is not yet available (e.g., creation)
        form.setValue("portfolio.subdomain", finalFullSubdomain, {
          shouldDirty: true,
        });
        form.setValue("portfolio.custom_domain", finalCustomDomain, {
          shouldDirty: true,
        });
        toast.info(
          "Domain settings updated locally. Save the portfolio to persist changes."
        );
      }
    } catch (error) {
      // Catch errors from updateTenant or other unexpected issues
      console.error("Error saving domain settings:", error);
      toast.error("Failed to save domain settings. Please try again.");
    } finally {
      setIsUpdatingDomain(false); // Ensure loading indicator stops
    }
  };

  return (
    <div className="space-y-6">
      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Portfolio Preview</span>
            </DialogTitle>
            <DialogDescription>
              This is how your portfolio will look after publishing
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 flex gap-2 flex-wrap">
            <Badge variant="outline" className="bg-primary/10">
              {selectedTheme?.name || "Default"} Theme
            </Badge>
            <Badge variant="outline" className="bg-primary/10">
              {colorTheme.charAt(0).toUpperCase() + colorTheme.slice(1)} Colors
            </Badge>
            <Badge variant="outline" className="bg-primary/10">
              {font.charAt(0).toUpperCase() + font.slice(1)} Font
            </Badge>
            <Badge variant="outline" className="bg-primary/10">
              {experiences.length} Experiences
            </Badge>
            <Badge variant="outline" className="bg-primary/10">
              {projects.length} Projects
            </Badge>
            <Badge variant="outline" className="bg-primary/10">
              {skills.length} Skills
            </Badge>
          </div>

          <div className="mt-4 border rounded-lg overflow-hidden h-[70vh]">
            {ThemeComponent ? (
              <div className="w-full h-full overflow-y-auto transform scale-[0.85] origin-top">
                <ThemeComponent
                  portfolio={portfolio}
                  experiences={experiences}
                  projects={projects}
                  socials={socials}
                  skills={skills}
                  educations={educations}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p>Preview not available</p>
              </div>
            )}
          </div>

          <div className="mt-4 flex justify-end">
            <Button onClick={() => setIsPreviewOpen(false)}>
              Close Preview
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="rounded-lg border p-4">
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div>
                <h3 className="text-lg font-medium">Make portfolio public</h3>
                <p className="text-sm text-muted-foreground">
                  Turn this on to make your portfolio accessible to everyone
                </p>
              </div>
              <FormField
                control={form.control}
                name="portfolio.is_published"
                render={({ field: _ }) => (
                  <FormItem>
                    <FormControl>
                      <Switch
                        checked={publishEnabled}
                        onCheckedChange={updatePublishState}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* URL Management Section */}
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-medium">Portfolio URL</h3>
            <p className="mb-3 text-sm text-muted-foreground">
              Configure how people access your portfolio
            </p>
            <div className="mb-4 rounded-md bg-amber-50 dark:bg-amber-950/30 p-3">
              <div className="flex items-start">
                <AlertCircleIcon className="size-5 mr-2 text-amber-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Domain setup required</p>
                  <p className="text-xs text-muted-foreground">
                    You must set up either a subdomain or custom domain before
                    publishing your portfolio.
                  </p>
                </div>
              </div>
            </div>

            <Tabs
              value={activeUrlTab}
              onValueChange={setActiveUrlTab}
              className="w-full"
            >
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="subdomain">Subdomain</TabsTrigger>
                <TabsTrigger value="custom">Custom Domain</TabsTrigger>
              </TabsList>

              <TabsContent value="subdomain">
                <div className="py-4 space-y-4">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="portfolio.subdomain"
                      render={({ field: _ }) => (
                        <FormItem>
                          <FormLabel>Subdomain</FormLabel>
                          <div className="flex items-center">
                            <Input
                              value={userInputSubdomain}
                              onChange={handleSubdomainChange}
                              placeholder="your-subdomain"
                              className="rounded-r-none"
                            />
                            <div className="rounded-r-md border border-l-0 bg-muted/50 px-3 py-2 text-sm">
                              .{process.env.NEXT_PUBLIC_DOMAIN}
                            </div>
                          </div>
                          {isValidatingSubdomain && (
                            <div className="text-sm text-muted-foreground mt-1 flex items-center">
                              <span className="size-3 mr-1 rounded-full animate-pulse bg-muted"></span>
                              Validating...
                            </div>
                          )}
                          {subdomainError && (
                            <div className="text-sm text-destructive mt-1 flex items-center">
                              <AlertCircleIcon className="size-3.5 mr-1" />
                              {subdomainError}
                            </div>
                          )}
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center mt-2">
                      {userInputSubdomain && !subdomainError ? (
                        <div className="flex items-center rounded-md border bg-muted/50 px-3 py-2 flex-1">
                          <span className="text-sm font-medium">
                            https://{userInputSubdomain}.
                            {process.env.NEXT_PUBLIC_DOMAIN}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCopyUrl}
                            className="ml-2"
                            disabled={!fullSubdomain}
                          >
                            {isCopied ? (
                              <CheckIcon className="size-4" />
                            ) : (
                              <CopyIcon className="size-4" />
                            )}
                          </Button>
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground">
                          Enter a valid subdomain to see your URL
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={saveDomainSettings}
                    disabled={
                      isUpdatingDomain ||
                      isValidatingSubdomain ||
                      !!subdomainError ||
                      !userInputSubdomain
                    }
                  >
                    {isUpdatingDomain ? "Saving..." : "Save Subdomain"}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="custom">
                <div className="py-4 space-y-4">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="portfolio.custom_domain"
                      render={({ field: _ }) => (
                        <FormItem>
                          <FormLabel>Custom Domain</FormLabel>
                          <Input
                            value={customDomain}
                            onChange={handleCustomDomainChange}
                            placeholder="yourdomain.com"
                          />
                          {isValidatingCustomDomain && (
                            <div className="text-sm text-muted-foreground mt-1 flex items-center">
                              <span className="size-3 mr-1 rounded-full animate-pulse bg-muted"></span>
                              Validating...
                            </div>
                          )}
                          {customDomainError && (
                            <div className="text-sm text-destructive mt-1 flex items-center">
                              <AlertCircleIcon className="size-3.5 mr-1" />
                              {customDomainError}
                            </div>
                          )}
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center mt-2">
                      {customDomain && !customDomainError ? (
                        <div className="flex items-center rounded-md border bg-muted/50 px-3 py-2 flex-1">
                          <span className="text-sm font-medium">
                            https://{customDomain}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCopyUrl}
                            className="ml-2"
                            disabled={!customDomain}
                          >
                            {isCopied ? (
                              <CheckIcon className="size-4" />
                            ) : (
                              <CopyIcon className="size-4" />
                            )}
                          </Button>
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground">
                          Enter a valid domain to see your URL
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      onClick={saveDomainSettings}
                      disabled={
                        isUpdatingDomain ||
                        isValidatingCustomDomain ||
                        !!customDomainError ||
                        !customDomain
                      }
                    >
                      {isUpdatingDomain ? "Saving..." : "Save Custom Domain"}
                    </Button>

                    <div className="p-3 border rounded-md bg-amber-50 dark:bg-amber-950/30 mt-4">
                      <h4 className="text-sm font-medium mb-2 flex items-center">
                        <AlertCircleIcon className="size-4 mr-2 text-amber-500" />
                        Domain Configuration Instructions
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        To use a custom domain, you'll need to configure DNS
                        settings with your domain provider:
                      </p>
                      <ol className="list-decimal list-inside text-xs text-muted-foreground mt-1 space-y-1">
                        <li>
                          Add an A record pointing to our server at
                          123.456.789.0
                        </li>
                        <li>
                          Add a CNAME record for www pointing to{" "}
                          {process.env.NEXT_PUBLIC_DOMAIN}
                        </li>
                        <li>Changes may take up to 48 hours to propagate</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Theme Information */}
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-medium">Theme Information</h3>
            <p className="mb-3 text-sm text-muted-foreground">
              Your portfolio is using these style settings
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 rounded-md bg-muted/30 flex items-center">
                <PaintbrushIcon className="size-4 mr-2 text-primary" />
                <div>
                  <span className="text-xs text-muted-foreground">Theme</span>
                  <p className="text-sm font-medium">
                    {selectedTheme?.name || "Default"}
                  </p>
                </div>
              </div>
              <div className="p-3 rounded-md bg-muted/30 flex items-center">
                <div
                  className="size-4 mr-2 rounded-full bg-primary"
                  style={{
                    background:
                      colorTheme === "custom"
                        ? form.getValues().options?.colors?.[4] || "#3B82F6"
                        : undefined,
                  }}
                ></div>
                <div>
                  <span className="text-xs text-muted-foreground">Colors</span>
                  <p className="text-sm font-medium">
                    {colorTheme.charAt(0).toUpperCase() + colorTheme.slice(1)}
                  </p>
                </div>
              </div>
              <div className="p-3 rounded-md bg-muted/30 flex items-center">
                <span className="size-4 mr-2 text-xs font-bold text-primary">
                  Aa
                </span>
                <div>
                  <span className="text-xs text-muted-foreground">Font</span>
                  <p className="text-sm font-medium">
                    {font.charAt(0).toUpperCase() + font.slice(1)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Summary */}
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-medium">Content Summary</h3>
            <p className="mb-3 text-sm text-muted-foreground">
              Your portfolio includes these sections
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              <div className="p-3 rounded-md bg-muted/30 flex flex-col items-center justify-center text-center">
                <BriefcaseIcon className="size-5 mb-2 text-primary" />
                <span className="text-sm font-medium">
                  {experiences.length}
                </span>
                <span className="text-xs text-muted-foreground">
                  Experiences
                </span>
              </div>
              <div className="p-3 rounded-md bg-muted/30 flex flex-col items-center justify-center text-center">
                <RocketIcon className="size-5 mb-2 text-primary" />
                <span className="text-sm font-medium">{projects.length}</span>
                <span className="text-xs text-muted-foreground">Projects</span>
              </div>
              <div className="p-3 rounded-md bg-muted/30 flex flex-col items-center justify-center text-center">
                <GraduationCapIcon className="size-5 mb-2 text-primary" />
                <span className="text-sm font-medium">{educations.length}</span>
                <span className="text-xs text-muted-foreground">
                  Educations
                </span>
              </div>
              <div className="p-3 rounded-md bg-muted/30 flex flex-col items-center justify-center text-center">
                <UserIcon className="size-5 mb-2 text-primary" />
                <span className="text-sm font-medium">{skills.length}</span>
                <span className="text-xs text-muted-foreground">Skills</span>
              </div>
              <div className="p-3 rounded-md bg-muted/30 flex flex-col items-center justify-center text-center">
                <LinkIcon className="size-5 mb-2 text-primary" />
                <span className="text-sm font-medium">{socials.length}</span>
                <span className="text-xs text-muted-foreground">
                  Social Links
                </span>
              </div>
            </div>
          </div>

          {/* Preview Portfolio Button */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div>
                <h3 className="text-lg font-medium">Preview Portfolio</h3>
                <p className="text-sm text-muted-foreground">
                  See how your portfolio will look before publishing
                </p>
              </div>
              <Button variant="default" onClick={handlePreview}>
                <EyeIcon className="mr-2 size-4" />
                Preview
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-muted/50 p-6">
          <div className="flex flex-col space-y-2">
            <h4 className="font-medium">Next steps after publishing</h4>
            <ul className="list-inside list-disc text-sm text-muted-foreground">
              <li>Share your portfolio on social media</li>
              <li>Include the link in your resume and job applications</li>
              <li>Keep your portfolio up to date with your latest work</li>
              <li>
                Consider setting up a custom domain for a professional touch
              </li>
            </ul>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
