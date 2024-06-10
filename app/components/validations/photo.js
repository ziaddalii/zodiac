import { z } from "zod";
import { requiredMsg } from "./util";

//CONFIG
const MAX_FILE_SIZE = 5000000;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

//VALIDATIONS
export const zPhoto = (is_required = false, key, t) => {
  const schema = z
    .custom((d) => d || (d.id && d.photo), requiredMsg(key, t))
    .refine(
      (file) => {
        const fileSize = (file ? file.size : file.photo?.size) ?? 0;

        return fileSize <= MAX_FILE_SIZE;
      },
      {
        message: t("validations.photoSize"),
      }
    )
    .refine(
      (file) => {
        const fileType = (file ? file.type : file.photo?.type) ?? "";

        return ACCEPTED_IMAGE_TYPES.includes(fileType);
      },
      {
        message: t("validations.photoType"),
      }
    );

  return is_required
    ? z.union([
        z.string().min(1, {
          message: t("validations.photoType"),
        }),
        schema,
      ])
    : z.optional(z.union([z.string(), schema]));
};

export const zPhotos = (is_required, key, t) => {
  const zodPhoto = zPhoto(is_required, key, t);

  return is_required
    ? z.union([z.string(), z.array(zodPhoto)])
    : z.optional(z.union([z.string(), z.array(zodPhoto)]));
};
