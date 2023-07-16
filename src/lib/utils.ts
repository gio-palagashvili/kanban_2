import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { AxiosError } from "axios"
import { ZodError } from "zod"

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
}