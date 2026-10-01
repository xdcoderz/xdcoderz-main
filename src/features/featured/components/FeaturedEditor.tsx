"use client";
import { useActionState, useEffect, useRef, useState } from "react";
import { Eye, Save, Send, EyeOff } from "lucide-react";
import { saveSpotlight } from "../actions";
import type { EditorState, Spotlight } from "../types";
import { FeaturedBanner } from "./FeaturedBanner";
import { isVisible } from "../validation";
import styles from "../featured.module.css";

function localDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

export function FeaturedEditor({ initial, published, unavailable }: {
  initial: Spotlight; published: Spotlight | null; unavailable: boolean;
}) {
  const [value, setValue] = useState(initial);
  const selectedFile = useRef<File | null>(null);
  const [uploadRevision, setUploadRevision] = useState(0);
  const [previewUrl, setPreviewUrl] = useState("");
  const [state, action, pending] = useActionState<EditorState, FormData>(async (previous, form) => {
    if (selectedFile.current) form.set("upload", selectedFile.current);
    const result = await saveSpotlight(previous, form);
    if (result.saved) {
      setValue(result.saved);
      setPreviewUrl("");
      selectedFile.current = null;
      setUploadRevision(revision => revision + 1);
    }
    return result;
  }, {});
  const [preview, setPreview] = useState(true);
  const [fileError, setFileError] = useState("");
  useEffect(() => {
    return () => { if (previewUrl) URL.revokeObjectURL(previewUrl); };
  }, [previewUrl]);
  const update = (key: keyof Spotlight, next: string | boolean) => setValue(v => ({ ...v, [key]: next }));
  const fields = [
    ["title", "Title", 100], ["description", "Description", 360],
    ["badge", "Badge (optional)", 60], ["href", "Destination link", 2048],
    ["buttonLabel", "Button label", 40], ["imageAlt", "Image description", 180],
  ] as const;
  return <div className={styles.editor}>
    <p className={styles.status}>Published status: {published ? isVisible(published) ? "Visible" : !published.enabled ? "Disabled" : "Outside scheduled dates" : "Default GridForge spotlight"}</p>
    <form action={action} className={styles.form}>
      {fields.map(([key, label, max]) => <label key={key}>
        <span>{label}</span>
        {key === "description" ?
          <textarea name={key} value={value[key]} onChange={e => update(key, e.target.value)} maxLength={max} required rows={3} /> :
          <input name={key} value={value[key]} onChange={e => update(key, e.target.value)} maxLength={max} required={key !== "badge"} />}
      </label>)}
      <input type="hidden" name="image" value={value.image} />
      <label>
        <span>Upload image</span>
        <input key={uploadRevision} type="file" name="upload" accept="image/png,image/jpeg,image/webp" onChange={e => {
          const file = e.target.files?.[0];
          selectedFile.current = null;
          setFileError("");
          setPreviewUrl("");
          if (file && (file.size > 2097152 || !["image/png","image/jpeg","image/webp"].includes(file.type))) {
            e.target.value = ""; setFileError("Use PNG, JPEG, or WebP, up to 2 MB."); return;
          }
          if (file) {
            selectedFile.current = file;
            setPreviewUrl(URL.createObjectURL(file));
          }
        }} />
        <small>PNG, JPEG, or WebP. Maximum 2 MB. A landscape image works best.</small>
      </label>
      <label className={styles.toggle}><input type="checkbox" name="enabled" checked={value.enabled} onChange={e => update("enabled", e.target.checked)} /> Enable when published</label>
      {(["startsAt", "endsAt"] as const).map(key => <label key={key}>
        <span>{key === "startsAt" ? "Start (optional)" : "End (optional)"}</span>
        <input type="datetime-local" value={localDate(value[key])} onChange={e => update(key, e.target.value ? new Date(e.target.value).toISOString() : "")} />
        <input type="hidden" name={key} value={value[key]} />
      </label>)}
      <p className={styles.hint}>Dates use your device timezone. Publishing replaces the current spotlight; a future start hides it until that time. Leave the end empty to keep it visible.</p>
      <div className={styles.actions}>
        <button type="button" onClick={() => setPreview(!preview)}><Eye size={16} />{preview ? "Hide preview" : "Show preview"}</button>
        <button name="intent" value="draft" disabled={pending || unavailable}><Save size={16} />Save draft</button>
        <button name="intent" value="publish" disabled={pending || unavailable}><Send size={16} />{pending ? "Saving..." : "Publish"}</button>
        <button name="intent" value="disable" formNoValidate disabled={pending || unavailable}><EyeOff size={16} />Hide live spotlight</button>
      </div>
      <div role="status" aria-live="polite">{state.error || fileError || state.message}</div>
    </form>
    {preview && <div className={styles.preview}><p className="section-kicker">Preview</p><FeaturedBanner value={{ ...value, image: previewUrl || value.image }} preview /></div>}
  </div>;
}

