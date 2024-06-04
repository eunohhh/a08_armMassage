import styled from 'styled-components';

const InputField = ({ label, type, placeholder, value, onChange, autoComplete }) => {
    return (
        <FieldContainer>
            <Label>{label}</Label>
            <StyledInput
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
            />
        </FieldContainer>
    );
};

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`;

const Label = styled.label`
    margin-bottom: 10px;
`;

const StyledInput = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
`;

export default InputField;
