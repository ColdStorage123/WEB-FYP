import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Verification = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const [actualCode, setActualCode] = useState(null);

    const codeInputs = useRef([]);
    const location = useLocation();
    const navigate = useNavigate();

    const userData = location.state?.userData;

    useEffect(() => {
        if (userData && Array.isArray(userData) && userData.length > 0) {
            setActualCode(userData[0]?.VerificationCode);
        }
    }, [userData]);

    const handleVerification = () => {
        if (!userData || !Array.isArray(userData) || userData.length === 0) {
            console.error('Error: User data is invalid.');
            return;
        }

        if (verificationCode.trim() === actualCode.toString().trim()) {
            const postData = {
                fullName: userData[0]?.fullName,
                email: userData[0]?.email,
                password: userData[0]?.password,
                confirmPassword: userData[0]?.confirmPassword,
                phoneNumber: userData[0]?.phoneNumber,
            };

            fetch('http://192.168.243.1:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            })
            .then(res => res.json())
            .then(data => {
                if (data.message === 'User Registered successfully') {
                    alert(data.message);
                    navigate('/login');
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error registering user:', error);
            });
        } else {
            alert('Incorrect verification code entered!');
        }
    };

    const handleChangeCode = (text, index) => {
        const updatedCode = verificationCode.split('');
        updatedCode[index] = text;
        setVerificationCode(updatedCode.join(''));
        if (text !== '' && index < codeInputs.current.length - 1) {
            codeInputs.current[index + 1].focus();
        }
    };

    return (
        <div className="verification-container">
            <h1>Verification</h1>
            <div className="code-container">
                {Array.from({ length: 6 }, (_, index) => (
                    <input
                        key={index}
                        ref={(ref) => (codeInputs.current[index] = ref)}
                        type="text"
                        maxLength={1}
                        value={verificationCode.charAt(index) || ''}
                        onChange={(e) => handleChangeCode(e.target.value, index)}
                    />
                ))}
            </div>
            <button className="verify-button" onClick={handleVerification}>
                Verify
            </button>
        </div>
    );
};

export default Verification;
