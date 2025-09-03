import { ReactNode } from "react"

export function H1({ children }: { children: ReactNode }) {
    return (
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
            {children}
        </h1>
    )
}
export function H2({ children }: { children: ReactNode }) {
    return (
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {children}
        </h2>
    )
}
export function H3({ children }: { children: ReactNode }) {
    return (
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {children}
        </h3>
    )
}
export function H4({ children }: { children: ReactNode }) {
    return (
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {children}
        </h4>
    )
}
export function P({ children }: { children: ReactNode }) {
    return (
        <p className="leading-7 [&:not(:first-child)]:mt-6">
            {children}
        </p>
    )
}
export function Blockquote({ children }: { children: ReactNode }) {
    return (
        <blockquote className="mt-6 border-l-2 pl-6 italic">
            {children}
        </blockquote>
    )
}

//TODO complete them
export function Table({ children }: { children: ReactNode }) {
    return (
        <div className="my-6 w-full overflow-y-auto">
            <table className="w-full">
                <thead>
                    <tr className="even:bg-muted m-0 border-t p-0">
                        <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                            King's Treasury
                        </th>
                        <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                            People's happiness
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="even:bg-muted m-0 border-t p-0">
                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                            Empty
                        </td>
                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                            Overflowing
                        </td>
                    </tr>
                    <tr className="even:bg-muted m-0 border-t p-0">
                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                            Modest
                        </td>
                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                            Satisfied
                        </td>
                    </tr>
                    <tr className="even:bg-muted m-0 border-t p-0">
                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                            Full
                        </td>
                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                            Ecstatic
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export function List({ children }: { children: ReactNode }) {
    return (
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>1st level of puns: 5 gold coins</li>
            <li>2nd level of jokes: 10 gold coins</li>
            <li>3rd level of one-liners : 20 gold coins</li>
        </ul>
    )
}
export function InlineCode({ children }: { children: ReactNode }) {
    return (
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            @radix-ui/react-alert-dialog
        </code>
    )
}
export function Lead({ children }: { children: ReactNode }) {
    return (
        <p className="text-muted-foreground text-xl">
            A modal dialog that interrupts the user with important content and expects
            a response.
        </p>
    )
}
export function Large({ children }: { children: ReactNode }) {
    return <div className="text-lg font-semibold">Are you absolutely sure?</div>
}
export function Small({ children }: { children: ReactNode }) {
    return (
        <small className="text-sm leading-none font-medium">Email address</small>
    )
}
export function Muted({ children }: { children: ReactNode }) {
    return (
        <p className="text-muted-foreground text-sm">Enter your email address.</p>
    )
}
