import { SaveIcon } from "lucide-react";
import { Button } from "../ui/button";
import Loader from "./Loader";

const SaveChangesBar = ({
  isDirty,
  isSubmitting,
  onSave,
  section,
}: {
  isDirty: boolean;
  isSubmitting: boolean;
  onSave: () => void;
  section: string;
}) => {
  if (!isDirty) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-lg p-4">
      <div className="container flex items-center justify-between mx-auto">
        <p className="text-sm text-muted-foreground">
          You have unsaved changes in the{" "}
          <span className="font-medium">{section}</span> section
        </p>
        <Button onClick={onSave} disabled={isSubmitting} className="gap-1.5">
          <Loader state={isSubmitting}>
            <SaveIcon className="size-4" />
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Loader>
        </Button>
      </div>
    </div>
  );
};

export default SaveChangesBar;
