import he from 'he';

function Paginate({ data, className, ...props }) {
    return (
        <nav {...props} role="navigation" aria-label="Paginator" className={`flex items-center justify-between ${className}`}>
            <div className="flex justify-between flex-1 sm:hidden">
                {!data.prev_page_url ?
                    <span className="relative rounded-full inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5">
                        Previous
                    </span>
                    :
                    <a href={data.prev_page_url} className="relative hover:bg-secondary hover:text-white rounded-full inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
                        Previous
                    </a>
                }

                {data.next_page_url ?
                    <a href={data.next_page_url} className="relative hover:bg-secondary hover:text-white rounded-full inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
                        Next
                    </a>
                    :
                    <span className="relative rounded-full inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5">
                        Next
                    </span>
                }
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700 leading-5">
                        Showing
                        <span className="font-medium"> {data.from} </span>
                        to
                        <span className="font-medium"> {data.to} </span>
                        of
                        <span className="font-medium"> {data.total} </span>
                        results
                    </p>
                </div>

                <div>
                    {(Array.isArray(data.links) && data.links.length > 0) &&
                        data.links.map(function (link) {
                            return (link.active || !link.url) ?
                                <span key={link.label} aria-current="page">
                                    <span className="relative rounded-full inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-default leading-5">
                                        {he.decode(link.label)}
                                    </span>
                                </span>
                                :
                                <span key={link.label} aria-current="page">
                                    <a href={link.url} className="relative cursor-pointer rounded-full inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-secondary hover:text-white transition-all duration-500 leading-5">
                                        {he.decode(link.label)}
                                    </a>
                                </span>
                        })
                    }
                </div>
            </div>

        </nav>

    );
}

export default Paginate;