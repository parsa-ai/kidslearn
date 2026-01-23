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

    return (
        <div className={`flex gap-1 ${className}`}>
            {Array.from({ length: quantityDeactive }, (v,i) => <Star key={i} />)}
            {Array.from({ length: quantity }, (v, i) => <Star isActive  key={i}/>)}
        </div>
    )
}

export default Stars