export async function verifyUser(token) {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
  
      if (!response.ok) throw new Error("Invalid Token");
      
      return await response.json(); // Returns user data
    } catch (error) {
      console.error("User verification failed:", error);
      return null;
    }
  }
  