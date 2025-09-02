import React, { useState, useEffect } from 'react';
import './aside.css';

const Aside = ({ onSelectBot }) => {
    const [bot, setBot] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}chatbots.json`)
            .then(res => res.json())
            .then(data => setBot(data));
    }, []);

    return (
        <>
            {/* Botón para abrir el menú en móvil */}
            <button
                className="btn btn-warning d-md-none m-2"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#asideOffcanvas"
                aria-controls="asideOffcanvas"
            >
                Chatbots
            </button>

            {/* Aside normal en desktop, offcanvas en móvil */}
            <div className="aside d-none d-md-flex flex-column p-3 overflow-auto">
                <div className="h1 text-center text-warning text-shadow ">
                    ChatClick
                </div>
                <hr />
                <div className="list-group">
                    {bot.map((b, idx) => (
                        <div className="bot-container" key={idx}>
                            <button
                                className="btn btn-dark list-group-item-action text-center text-warning bot-btn position-relative"
                                onClick={() => onSelectBot(b.value[0])}
                            >
                                <img
                                    src={b.value[0].image_url || ""}
                                    alt={b.value[0].name}
                                    className="chatbot-img-bg"
                                />
                                <span className="bot-btn-text position-relative">
                                    {b.value[0].name}
                                </span>
                            </button>
                        </div>
                    ))}
                </div>
                <hr />
                <div className="text-center text-muted small">
                    &copy; 2025 ChatClick. All rights reserved.
                    version 1.0 (Beta)
                </div>
            </div>

            {/* Offcanvas para móvil */}
            <div
                className="offcanvas offcanvas-start d-md-none"
                tabIndex="-1"
                id="asideOffcanvas"
                aria-labelledby="asideOffcanvasLabel"
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title text-warning" id="asideOffcanvasLabel">ChatClick</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="list-group">
                        {bot.map((b, idx) => (
                            <div className="bot-container" key={idx}>
                                <button
                                    className="btn btn-dark list-group-item-action text-center text-warning bot-btn position-relative w-100 mb-2"
                                    onClick={() => onSelectBot(b.value[0])}
                                    data-bs-dismiss="offcanvas"
                                >
                                    <img
                                        src={b.value[0].image_url || ""}
                                        alt={b.value[0].name}
                                        className="chatbot-img-bg"
                                    />
                                    <span className="bot-btn-text position-relative">
                                        {b.value[0].name}
                                    </span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Aside;