import Image from "next/image";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.02)]">
      <div className="h-16 px-margin-mobile flex items-center justify-between">
        <div className="flex items-center gap-unit">
          <div className="relative w-8 h-8">
            <Image
              alt="Meowney Logo"
              className="object-contain"
              fill
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAge4t_FkGcaylJ-2zXMUOuRstpUBZXDFhMRwwOMc6xk-GJC3nHRyRNQdWgjxN44mPbrxOSTgao7MAYAgR_wk6G48jPXIz-5lb1uO9KadrcqV0t2PTmWgA3QksGpY3lKjSQ-3Zp_akV7hD0qqUE9iDdcfZIuD-QRsQuYD8v7qehv4KznEubKIsEDjb5HJYzka8BcBDfEak9YNXKhbY2i7M_hAlB1GIzG2CksRx5Pg9uV5MUIYbJERfP"
            />
          </div>
          <span className="font-headline-md text-headline-md text-primary ml-2 tracking-tight">
            {title}
          </span>
        </div>
        <div className="relative w-9 h-9 rounded-full overflow-hidden shadow-sm ring-2 ring-sakura-pink/30">
          <Image
            alt="Profile"
            className="object-cover"
            fill
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMG7yRoAXdNaeC57pEKjPZCGnbRrS--CVnH4KyB6eXdYOFLlRxQbDw7M12Fv6Fq2bveh-vB25qDqI7-kQEjBKF0y60WmoDtjJ0RG-gVde6mh7296kWBmXltu5fI3PYwCRTOUhl-rjlbUXfi69r-NkVcp50P38e_PSc3v8ARv8gTdoqaUjRwgnEsHGQpmMsAADD5C4tu0gEGXSXqzO-k084pFMbqSOSc4pHPkrHegFaIXwoJG_sUXso"
          />
        </div>
      </div>
    </header>
  );
}
