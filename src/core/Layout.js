import '../styles.css'

export default function Layout({title='Title', description='Description', className, children}){

    return (
        <div className='jumbotron'>
            <div  className="p-5">
                <h2 className="mb-3 text-white">{title}</h2>
                <p className='text-white'>{description}</p>
            </div>
           <div className={className}>{children}</div>
        </div>
    );
}