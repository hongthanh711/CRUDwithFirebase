import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    item: { name: string; id: string }
}
export default function CardProduct({ item, ...rest }: CardProps) {
    return (
        <div {...rest} className="w-full cursor-pointer bg-slate-400 p-3 rounded-sm">
            <div className="w-full aspect-square relative">
                <img
                    className="w-full h-full"
                    src="https://cdn.lifefamilyfun.com/wp-content/uploads/How-To-Draw-a-Unicorn.jpg"
                    alt="product-1"
                />
            </div>
            <div className="p-2 w-full">
                <p className="font-semibold text-[30px]">{item.name}</p>
                {/* <span>Id: {item.id}</span> */}
            </div>
        </div>
    )
}
