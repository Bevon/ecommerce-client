// import Menu from "./Menu";

export default function Layout({title='Title', description='Description', className, children}){

    return (
        <div>
            <div  className="p-5 text-center bg-light">
                <h2 className="mb-3">{title}</h2>
                <p className='text-primary'>{description}</p>
            </div>
           <div className={className}>{children}</div>
        </div>
    );
}