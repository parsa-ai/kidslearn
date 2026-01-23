import Star from "./Star"

function Stars({ quantity, className = "" }: { quantity: number, className?: string }) {
    if (!quantity) {
        quantity = 0
    }
    if (quantity > 3) {
        quantity = 3
    }
    let quantityDeactive = 3 - quantity
    if (quantityDeactive < 0) {
        quantityDeactive = 0
    }
    console.log(quantity, quantityDeactive);

    return (
        <div className={`flex gap-1 ${className}`}>
            {Array.from({ length: quantityDeactive }, () => <Star />)}
            {Array.from({ length: quantity }, () => <Star isActive />)}
        </div>
    )
}

export default Stars