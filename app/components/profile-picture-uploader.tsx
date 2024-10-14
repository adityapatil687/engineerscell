import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import Image from 'next/image';
import translations from '../public/translations';
import { useLanguage } from '../context/LanguageContext';

interface ProfilePictureUploaderProps {
  onImageUpload: (base64Image: string) => void;
}

export interface ProfilePictureUploaderRef {
  resetImage: () => void;
}

const MAX_FILE_SIZE = 256 * 1024; // 256 KB

const ProfilePictureUploader = forwardRef<ProfilePictureUploaderRef, ProfilePictureUploaderProps>(
  ({ onImageUpload }, ref) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isCompressing, setIsCompressing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const { language } = useLanguage();

    useImperativeHandle(ref, () => ({
      resetImage: () => {
        setPreviewUrl(null);
        setError(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        onImageUpload(''); // Clear image in the parent component
      }
    }));

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
          setError('Image size must be less than 256 KB.');
          setPreviewUrl(null);
          return;
        }

        setIsCompressing(true);
        setError(null); // Clear previous error

        try {
          const base64 = await convertToBase64(file);
          setPreviewUrl(base64);
          onImageUpload(base64);
        } catch (error) {
          console.error('Error handling file:', error);
          setError('Failed to upload the image. Please try again.');
        } finally {
          setIsCompressing(false);
        }
      }
    };

    const convertToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    };

    const handleClick = () => {
      fileInputRef.current?.click();
    };

    return (
      <div className="flex flex-col items-center space-y-4">
        <div
          className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center cursor-pointer overflow-hidden relative"
          onClick={handleClick}
        >
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Profile"
              width={128}
              height={128}
              className="object-cover"
            />
          ) : (
            <span>{translations[language].uploadPhoto}</span>
          )}

          {isCompressing && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
            </div>
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {error && <p className="text-sm text-red-500">{error}</p>}
        {isCompressing && !error && <p className="text-sm text-gray-500">Processing image...</p>}
      </div>
    );
  }
);

ProfilePictureUploader.displayName = 'ProfilePictureUploader';

export default ProfilePictureUploader;
