export default function ProfileHeader() {
    return (
        <section className="flex items-center justify-between px-8 py-4">
            <div>
                <h1 className="text-xl font-bold">Ifnu Umar</h1>
                <p className="text-white/40">ifnuu01@gmail.com</p>
            </div>
            <img
                className="w-20 h-20 rounded-full object-cover"
                src="https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </section>
    )
}
