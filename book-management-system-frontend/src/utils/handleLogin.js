

export const handleLogin = async (values, login, client, navigate) => {
    const { username, password} = values;

    try {
      const response = await login({ variables: { username, password }});
      localStorage.setItem("token", response.data.login.token);
      await client.refetchQueries({
        include: "active",
      });
      
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

