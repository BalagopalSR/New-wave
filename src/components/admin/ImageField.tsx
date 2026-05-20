import { Upload } from 'lucide-react';
import { useRef, useState } from 'react';
import { isDisplayableImageUrl, normalizeImageUrl, readFileAsDataUrl } from '../../lib/imageUrl';

type ImageFieldProps = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
};

export function ImageField({ label, value, onChange, hint }: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadError, setUploadError] = useState('');
  const [uploading, setUploading] = useState(false);

  const displayUrl = normalizeImageUrl(value);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setUploadError('');
    setUploading(true);
    try {
      const dataUrl = await readFileAsDataUrl(file);
      onChange(dataUrl);
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block">
        <span className="text-sm text-cinematic-muted">{label}</span>
        <input
          type="url"
          value={value.startsWith('data:') ? '' : value}
          onChange={(e) => {
            onChange(e.target.value);
            setUploadError('');
          }}
          placeholder="https://... or upload an image below"
          className="mt-1 w-full rounded-xl border border-white/15 bg-cinematic-bg px-4 py-2.5 text-sm focus:border-cinematic-gold focus:outline-none"
        />
        {value.startsWith('data:') && (
          <p className="mt-1 text-xs text-cinematic-gold">Using uploaded image (stored in browser)</p>
        )}
        {hint && <p className="mt-1 text-xs text-cinematic-muted">{hint}</p>}
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            void handleFile(e.target.files?.[0]);
            e.target.value = '';
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="btn-outline py-2 text-sm"
        >
          <Upload className="h-4 w-4" />
          {uploading ? 'Uploading…' : 'Upload image'}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-sm text-cinematic-crimson hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      {uploadError && <p className="text-sm text-cinematic-crimson">{uploadError}</p>}

      {isDisplayableImageUrl(displayUrl) && (
        <div className="overflow-hidden rounded-xl border border-white/10">
          <img
            src={displayUrl}
            alt="Preview"
            referrerPolicy="no-referrer"
            className="max-h-48 w-full object-cover"
          />
        </div>
      )}
    </div>
  );
}
