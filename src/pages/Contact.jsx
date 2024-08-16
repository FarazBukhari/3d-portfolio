import React, { Suspense, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Canvas } from '@react-three/fiber';
import Fox from '../models/Fox';
import Loader from '../components/Loader';
import useAlert from '../hooks/useAlert';
import Alert from '../components/ALert';

const initialValues = { name: '', email: '', message: '' };
const animations = {
    IDLE: 'idle',
    WALK: 'walk',
    RUN: 'hit'
};

const Contact = () => {
    const formRef = useRef(null);
    const [form, setForm] = useState(initialValues);
    const [isLoading, setIsLoading] = useState(false);
    const [currentAnimation, setCurrentAnimation] = useState(animations.IDLE);

    const { alert, showAlert, hideAlert } = useAlert();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFocus = () => {
        setCurrentAnimation(animations.WALK);
    };

    const handleBlur = () => {
        setCurrentAnimation(animations.IDLE);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setCurrentAnimation(animations.RUN);

        emailjs
            .send(
                import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
                {
                    from_name: form.name,
                    to_name: 'Faraz',
                    from_email: form.email,
                    to_email: import.meta.env.VITE_APP_EMAILJS_RECIEVER_EMAIL,
                    message: form.message
                },
                import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
            )
            .then(() => {
                setIsLoading(false);
                showAlert({ show: true, text: 'Message sent successfully!', type: 'success' });

                setTimeout(() => {
                    setCurrentAnimation(animations.IDLE);
                    setForm(initialValues);
                }, 3000);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
                setCurrentAnimation(animations.IDLE);
                showAlert({ show: true, text: "I didn't recieve your message", type: 'danger' });
            });
    };
    return (
        <section className="relative flex lg:flex-row flex-col max-container">
            {alert.show && <Alert {...alert} />}
            <div className="flex-1 min-w-[50%] flex flex-col">
                <h1 className="head-text">Get in touch</h1>
                <form className="w-full flex flex-col gap-7 mt-14" onSubmit={handleSubmit}>
                    <label className="text=black=500 font-semibold">
                        Name
                        <input
                            type="text"
                            name="name"
                            className="input"
                            placeholder="John"
                            required
                            value={form.name}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </label>
                    <label className="text=black=500 font-semibold">
                        Email
                        <input
                            type="email"
                            name="email"
                            className="input"
                            placeholder="john@gmail.com"
                            required
                            value={form.email}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </label>
                    <label className="text=black=500 font-semibold">
                        Your Message
                        <textarea
                            name="message"
                            className="textarea"
                            placeholder="Let me know how I can help you"
                            required
                            rows={4}
                            value={form.message}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </label>

                    <button type="submit" className="btn" onFocus={handleFocus} onBlur={handleBlur} disabled={isLoading}>
                        {isLoading ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
            <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
                <Canvas
                    camera={{
                        position: [0, 0, 5]
                    }}
                >
                    <directionalLight intensity={2.5} position={[0, 0, 1]} />
                    <ambientLight intensity={0.5} />
                    <Suspense fallback={<Loader />}>
                        <Fox
                            currentAnimation={currentAnimation}
                            position={[0.5, 0.35, 0]}
                            rotation={[12.6, -0.6, 0]}
                            scale={[0.5, 0.5, 0.5]}
                        />
                    </Suspense>
                </Canvas>
            </div>
        </section>
    );
};

export default Contact;
