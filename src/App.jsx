import React, { Suspense, useState, useTransition, useId } from 'react';
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
    const [showComponent, setShowComponent] = useState(false);
    const [search, setSearch] = useState('');
    const [isPending, startTransition] = useTransition();
    const [filteredData, setFilteredData] = useState([]);
    const data = ['Dog', 'Cat', 'Rabbit', 'Bird', 'Horse'];

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        startTransition(() => {
            setFilteredData(data.filter(item => item.toLowerCase().includes(value.toLowerCase())));
        });
    };

    return (
        <div>
            <button onClick={() => setShowComponent(true)}>Load Heavy Component</button>
            {showComponent && (
                <Suspense fallback={<div>Loading heavy component...</div>}>
                    <HeavyComponent data={filteredData} />
                </Suspense>
            )}

            <div>
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search animals..."
                />
                {isPending ? <div>Loading filtered results...</div> : (
                    <ul>
                        {filteredData.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                )}
            </div>

            <div>
                <h2>Email Subscriptions</h2>
                <EmailForm />
                <EmailForm />
                <EmailForm />
            </div>
        </div>
    );
}

function EmailForm() {
    const emailId = useId();
    return (
        <form>
            <label htmlFor={emailId}>Email:</label>
            <input id={emailId} type="email" name="email" placeholder="Enter your email" />
        </form>
    );
}

export default App;