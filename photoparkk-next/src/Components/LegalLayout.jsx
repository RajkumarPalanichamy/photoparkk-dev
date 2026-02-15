
import React from 'react';

const LegalLayout = ({ children, title }) => {
    return (
        <div className="bg-neutral-50 min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-neutral-100 p-8 md:p-12">
                {children}
            </div>
        </div>
    );
};

export default LegalLayout;
