import React, { useState } from 'react';

import { InputField, Button } from 'shared/components';
import { MoviesAction } from 'types';

interface AddMovieFormProps {
  onSubmit: (data: Record< "imageUrl" | "title" | "subtitle" | "description", string>) => void,
  onCancel: () => void,
}

export function AddMovieForm({ onSubmit, onCancel }: AddMovieFormProps) {
  // TODO: Implement form for adding a movie
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!imageUrl || !title || !subtitle || !description) {
      return;
    }
    onSubmit({
      imageUrl,
      title,
      subtitle,
      description
    });
  };

  return (
    <form className="p-4 ">
      {/* TODO: Add code to make form actions work */}
      <InputField name="Url" value={imageUrl} setter={(v) => setImageUrl(v)}/>
      <InputField name="Title"  value={title} setter={(v) => setTitle(v)} />
      <InputField name="Subtitle"  value={subtitle} setter={(v) => setSubtitle(v)}/>
      <InputField name="Description"  value={description} setter={(v) => setDescription(v)}/>
      <div className="text-center">
      <Button onClick={() => {handleSubmit()}}>
        Submit
      </Button>
      <Button onClick={() => {onCancel()}}>
        Cancel
      </Button>
      </div>
    </form>
  );
}
