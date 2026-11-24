import Button from "./button";
import Check from "../assets/icons/check.svg";

interface IPricingCardProps {
    title: string;
    description: string;
    price: string;
    period?: string;
    features: string[];
    buttonText?: string;
    premium?: boolean;
    bonus?: string;
}

export default function PricingCard({ title, description, price, period, features, buttonText = "Assinar agora", premium, bonus }: IPricingCardProps) {
    return (
        <div className={premium ? "pricing-card premium" : "pricing-card"}>
            {bonus && (
                <span className="bonus">
                    <p>{bonus}</p>
                </span>
            )}
            <span className="plan">
                <h3>{title}</h3>
                <p>{description}</p>
            </span>
            <span className="price">
                <h2>{price}</h2>
                {period && <p>{period}</p>}
            </span>
            <Button text={buttonText} secondary={!premium} />
            <span className="hr" />
            {features.map((feature) => (
                <span className="features" key={feature}>
                    <img src={Check} alt="ícone check" width={24} height={24} />
                    <p>{feature}</p>
                </span>
            ))}
        </div>
    );
}
