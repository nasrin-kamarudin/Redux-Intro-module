
// export const getUserTasks = async () => {
//   const response = await fetch("/api/user-tasks");
//   return response.json();
// };

export const loginAndGetTasks = async () => {
  try {
    // Step 1: POST /system/login
    const loginResponse = await fetch("/api/system/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_groups: true,
        requested_lifetime: 7200
      }),
    });

    if (!loginResponse.ok) {
      throw new Error("Login failed");
    }

    const loginData = await loginResponse.json();
    const token = loginData.token;

    // Step 2: GET /user-task with token
    const tasksResponse = await fetch("/api/user-task", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!tasksResponse.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const tasksData = await tasksResponse.json();
    return {
      token,
      expiry: loginData.expiry_date,
      tasks: tasksData
    };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};