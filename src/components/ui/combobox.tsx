'use client';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

type Item = {
  value: string;
  label: string;
  icon?: React.ReactNode;
  group?: string;
};

type ComboboxProps = {
  items: Item[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  groups?: {
    id: string;
    name: string;
  }[];
  className?: string;
  disabled?: boolean;
  showIcon?: boolean;
};

export function Combobox({
  items,
  value,
  onChange,
  placeholder = 'Select an item...',
  searchPlaceholder = 'Search...',
  emptyMessage = 'No items found.',
  groups,
  className,
  disabled = false,
  showIcon = true,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const selectedItem = React.useMemo(() => {
    return items.find(item => item.value === value);
  }, [items, value]);

  // Gruplandırılmış öğeler
  const groupedItems = React.useMemo(() => {
    if (!groups) {
      return { undefined: items };
    }

    return items.reduce((acc, item) => {
      const group = item.group || 'other';
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(item);
      return acc;
    }, {} as Record<string, Item[]>);
  }, [items, groups]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'w-full justify-between',
            className,
          )}
          disabled={disabled}
        >
          <div className="flex items-center gap-2 truncate">
            {selectedItem && showIcon && selectedItem.icon && (
              <span className="shrink-0">{selectedItem.icon}</span>
            )}
            <span className="truncate">
              {selectedItem ? selectedItem.label : placeholder}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        align="start"
        sideOffset={5}
        onWheel={(e) => {
          e.preventDefault();

          const commandList = e.currentTarget.querySelector('[cmdk-list]');
          if (commandList) {
            commandList.scrollTop += e.deltaY;
          }
        }}
      >
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList className="max-h-[300px] overflow-y-auto">
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            {groups
              ? (
                  Object.entries(groupedItems).map(([groupId, groupItems]) => {
                    if (groupItems.length === 0) {
                      return null;
                    }
                    const groupName = groups.find(g => g.id === groupId)?.name || groupId;

                    return (
                      <CommandGroup key={groupId} heading={groupName}>
                        {groupItems.map(item => (
                          <CommandItem
                            key={item.value}
                            value={item.value}
                            onSelect={(currentValue) => {
                              onChange(currentValue === value ? '' : currentValue);
                              setOpen(false);
                            }}
                          >
                            <div className="flex items-center gap-2">
                              {showIcon && item.icon && (
                                <span className="shrink-0">{item.icon}</span>
                              )}
                              {item.label}
                            </div>
                            <Check
                              className={cn(
                                'ml-auto size-4',
                                value === item.value ? 'opacity-100' : 'opacity-0',
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    );
                  })
                )
              : (
                  <CommandGroup>
                    {items.map(item => (
                      <CommandItem
                        key={item.value}
                        value={item.value}
                        onSelect={(currentValue) => {
                          onChange(currentValue === value ? '' : currentValue);
                          setOpen(false);
                        }}
                      >
                        <div className="flex items-center gap-2">
                          {showIcon && item.icon && (
                            <span className="shrink-0">{item.icon}</span>
                          )}
                          {item.label}
                        </div>
                        <Check
                          className={cn(
                            'ml-auto size-4',
                            value === item.value ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
