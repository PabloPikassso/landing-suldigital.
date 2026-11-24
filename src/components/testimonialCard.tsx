import Star from "../assets/icons/star.svg";
import StarOuter from "../assets/icons/star-outer.svg";

interface ITestimonialCardProps {
    image: string;
    text: string;
    name: string;
    role: string;
    rating: number;
}

export default function TestimonialCard({ image, text, name, role, rating }: ITestimonialCardProps) {
    return (
        <div className="carousel-card">
            <img src={image} alt={`Foto de ${name}`} />
            <span className="testimony">
                <p>{text}</p>
            </span>
            <span className="rating">
                {Array.from({ length: 5 }, (_, i) =>
                    i < rating
                        ? <img key={i} src={Star} alt="ícone estrela" width={22} height={20} />
                        : <img key={i} src={StarOuter} alt="ícone estrela sem fundo" width={22} height={20} />
                )}
            </span>
            <span className="names">
                <p>{name}</p>
                <p>{role}</p>
            </span>
        </div>
    );
}
