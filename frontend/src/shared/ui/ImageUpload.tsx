import { useState, useRef } from 'react';
import { convertImageToBase64 } from '../lib/imageConverter';
import styled from 'styled-components';

interface ImageUploadProps {
  value?: string | null;
  onChange: (base64: string | null) => void;
}

const ImageUploadContainer = styled.div`
  margin: 10px 0;
`;

const ImagePreview = styled.div`
  position: relative;
  display: inline-block;
`;

const PreviewImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  border-radius: 8px;
  object-fit: cover;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: -10px;
  right: -10px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 20px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;

  &:hover {
    background: #c0392b;
  }
`;

const ImagePlaceholder = styled.div`
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s;

  &:hover {
    border-color: #667eea;
  }
`;

const PlaceholderIcon = styled.span`
  font-size: 48px;
  color: #999;
  display: block;
  margin-bottom: 10px;
`;

const PlaceholderText = styled.p`
  color: #666;
  margin: 0;
`;

const HiddenInput = styled.input`
  display: none;
`;

export const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Размер файла не должен превышать 5MB');
      return;
    }

    try {
      const base64 = await convertImageToBase64(file);
      setPreview(base64);
      onChange(base64);
    } catch (error) {
      console.error('Error converting image:', error);
      alert('Ошибка загрузки изображения');
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <ImageUploadContainer>
      {preview ? (
        <ImagePreview>
          <PreviewImage src={preview} alt="Preview" />
          <RemoveButton type="button" onClick={handleRemove}>
            ×
          </RemoveButton>
        </ImagePreview>
      ) : (
        <ImagePlaceholder onClick={() => fileInputRef.current?.click()}>
          <PlaceholderIcon>+</PlaceholderIcon>
          <PlaceholderText>Нажмите для загрузки изображения</PlaceholderText>
        </ImagePlaceholder>
      )}
      <HiddenInput
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </ImageUploadContainer>
  );
};

