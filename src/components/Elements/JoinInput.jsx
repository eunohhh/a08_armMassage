function JoinInput({ id, type, label, value, eholder, onChange }) {
    return (
        <div>
            <label htmlFor={id}>{label}:</label>
            <br></br>
            <input type={type} placeholder={eholder} id={id} value={value} onChange={onChange} />
        </div>
    );
}

export default JoinInput;
