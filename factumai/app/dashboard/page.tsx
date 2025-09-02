import Link from "next/link";

export default function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <Link href="/dashboard/clients">Clients</Link>
            </div>
            <div>
                <Link href="/dashboard/products">Products</Link>
            </div>
        </div>
    )
}