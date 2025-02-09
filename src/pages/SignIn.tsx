
const SignIn = ({
    email,
    setEmail,
    setAuthenticated
} : {
    email: string,
    setEmail: (prop: string) => void,
    setAuthenticated : (prop: boolean) => void
}) => {

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setAuthenticated(true);


        // const test = {"email": email};

        // if(email !== '') {
        //     localStorage.setItem("tune_upwards", JSON.stringify(test));
        // }
    }

    return (
        <div>
            <h1>Welcome to TuneUpwards</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <button>Sign In</button>
            </form>
        </div>
    )
}
export default SignIn