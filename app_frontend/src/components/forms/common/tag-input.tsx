"use client";

import { Tag, TagInput as EmblorTagInput } from "emblor";
import { useId, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const TagInputField = ({ name }: { name: string }) => {
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
          tagList: {
            container: "gap-1",
          },
          input:
            "rounded-md transition-[color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-ring outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
          tag: {
            body: "relative h-7 bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
            closeButton:
              "absolute -inset-y-px -end-px p-0 rounded-s-none rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-muted-foreground/80 hover:text-foreground",
          },
        }}
        activeTagIndex={activeTagIndex}
        setActiveTagIndex={setActiveTagIndex}
        inlineTags={false}
        inputFieldPosition="top"
      />
    </div>
  );
};

export default TagInputField;
