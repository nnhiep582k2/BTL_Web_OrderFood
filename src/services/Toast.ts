import { TypeToast } from "@/enums/TypeToast"
import { toast } from "vue3-toastify"

export const notify = (message: string, type: TypeToast) => {
    if (type === TypeToast.success) {
        toast.success(message)
    }else if(type === TypeToast.error){
        toast.error(message)
    }
}