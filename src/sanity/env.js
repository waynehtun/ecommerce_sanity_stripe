export const apiVersion =
  process.env.SANITY_STUDIO_API_VERSION || "2024-12-27";

export const dataset = assertValue(
  process.env.SANITY_STUDIO_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET"
);

export const projectId = assertValue(
  process.env.SANITY_STUDIO_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  // console.log("SANITY DATASET:", process.env.SANITY_STUDIO_DATASET);
  // console.log("SANITY PROJECT ID:", process.env.SANITY_STUDIO_PROJECT_ID);

  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
