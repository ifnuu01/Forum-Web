export default function CommentCard() {
    return (
        <div className="mt-2">
            <section className="flex items-center gap-2 ">
                <img
                    className="w-10 h-10 rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <h2>Ifnu Umar</h2>
                <span className="text-white/40">12 hari lalu</span>
            </section>
            <div className="ml-12">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, sunt id omnis dolorem aut iure consequatur? Non, minima sequi iure veniam consequuntur, ea illo consectetur eligendi ut quisquam dicta at.</p>
            </div>
        </div>
    )
}
