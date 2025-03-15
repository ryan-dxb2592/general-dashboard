"use client";

import { Tag, TagInput as EmblorTagInput } from "emblor";
import { useId, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const TagInputInlineField = ({ name }: { name: string }) => {
  const { control } = useFormContext();
  const id = useId();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TagInputComponent
          id={id}
          value={field.value || []}
          onChange={field.onChange}
        />
      )}
    />
  );
};

interface TagInputComponentProps {
  id: string;
  value?: Tag[];
  onChange: (tags: Tag[]) => void;
}

const TagInputComponent = ({
  id,
  value = [],
  onChange,
}: TagInputComponentProps) => {
  const [exampleTags, setExampleTags] = useState<Tag[]>(value);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  // Update the parent form when tags change
  const handleTagsChange = (newTags: Tag[]) => {
    setExampleTags(newTags);
    onChange(newTags);
  };

  return (
    <div className="*:not-first:mt-2">
      <EmblorTagInput
        id={id}
        tags={exampleTags}
        // @ts-expect-error - The type definitions for emblor TagInput are incorrect
        setTags={handleTagsChange}
        placeholder="Add a tag"
        styleClasses={{
          inlineTagsContainer:
            "border-input rounded-md bg-background shadow-xs transition-[color,box-shadow] focus-within:border-ring outline-none focus-within:ring-[3px] focus-within:ring-ring/50 p-1 gap-1",
          input: "w-full min-w-[80px] shadow-none px-2 h-7",
          tag: {
            body: "h-7 relative bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
            closeButton:
              "absolute -inset-y-px -end-px p-0 rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-muted-foreground/80 hover:text-foreground",
          },
        }}
        activeTagIndex={activeTagIndex}
        setActiveTagIndex={setActiveTagIndex}
      />
    </div>
  );
};

export default TagInputInlineField;
