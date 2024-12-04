import { createContext } from "react"

type ImageContext={
    images: string[]
    addImage: (uri: string) => void;
}
 const ImagesContext=createContext<ImageContext>({
    images: [],
    addImage: () => {}
 });

 export default ImagesContext