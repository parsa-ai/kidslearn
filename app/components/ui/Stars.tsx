import StarIcon from "@/app/components/icons/StarIcon"


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
        <div className={`flex gap-1.5 h-8 items-center justify-center rounded-2xl w-fit px-3 border border-yellow-500/30 bg-white/90 ${className}`}>
            {Array.from({ length: quantityDeactive }, (v, i) => <StarIcon className="w-6 h-6 fill-yellow-500/30  " key={i} />)}
            {Array.from({ length: quantity }, (v, i) => <div key={i} className="flex justify-center items-center">
                <StarIcon className="w-6 h-6 fill-yellow-500" />
                <StarIcon className="w-6 h-6 fill-yellow-500 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] absolute  opacity-40" />
                <StarIcon className="w-6 h-6 fill-yellow-500 absolute opacity-80 blur-xs" />
            </div>)}
        </div>

    )
}

export default Stars