import photo1 from "@/assets/photos/fotoSorriso.jpg";
import photo2 from "@/assets/photos/fotoOlhar.jpg";
import photo3 from "@/assets/photos/fotoJeito.jpg";
import photo4 from "@/assets/photos/fotoCriancas.jpg";

export interface PhotoData {
    image: string;
    label: string;
    description: string;
    rotation: number;
}

export const PHOTOS_DATA: PhotoData[] = [
    {
        image: photo1,
        label: "Seu sorriso",
        description:
            "Tenha certeza que as palhaçadas que faço é para ver esse sorriso que contagia tudo ao redor. Quero arrancar um sorriso seu até nos dias mais difíceis, e que eu possa ser um motivo para esse sorriso aparecer com frequência na sua vida.",
        rotation: -3,
    },
    {
        image: photo2,
        label: "Seu olhar",
        description:
            "Esse olhar que diz tanta coisa sem precisar de palavras. É nele que eu me perco e me encontro ao mesmo tempo.",
        rotation: 2,
    },
    {
        image: photo3,
        label: "Seu jeito",
        description:
            "Seu jeitinho único de ser, de lutar, de cuidar, de amar. Tudo em você é especial de um jeito que só você consegue ser.",
        rotation: -1,
    },
    {
        image: photo4,
        label: "Seu carinho",
        description:
            "Esse carinho que você tem pelas crianças, e por todos ao seu redor. É um dos seus maiores presentes para o mundo, e eu admiro demais isso em você, além de ser algo em comum entre nós.",
        rotation: 2,
    },
];
