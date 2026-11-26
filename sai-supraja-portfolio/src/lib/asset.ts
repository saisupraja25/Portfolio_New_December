/** Prefix a public path with the deploy base path (GitHub project pages live under /<repo>). */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;
