import pool from "../config/db.js";
import errorProvider from "../utils/errorProvider.js";

export const getAllStudents = async (req, res, next) => {
  try {
    const conn = await pool.getConnection();
    try {
      const [students] = await conn.execute(
        `SELECT 
            u.user_id, 
            u.user_name, 
            sd.name, 
            sd.d_id, 
            sd.email, 
            sd.contact_no, 
            sd.address, 
            sd.status 
          FROM user u
          INNER JOIN student s ON u.user_id = s.user_id
          INNER JOIN student_detail sd ON s.s_id = sd.s_id
          WHERE u.role_id = 5`
      );

      // Debugging log
      console.log("Retrieved students:", students);
      if (!students.length) {
        return res.status(404).json({ message: "No students found" });
      }

      return res.status(200).json({ students });
    } catch (error) {
      console.error("Error retrieving students:", error);
      return next(
        errorProvider(500, "An error occurred while retrieving students")
      );
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error("Database connection error:", error);
    return next(errorProvider(500, "Failed to establish database connection"));
  }
};

export const getAllManagers = async (req, res, next) => {
  try {
    const conn = await pool.getConnection();
    try {
      const [managers] = await conn.execute(
        `SELECT 
            u.user_id, 
            u.user_name, 
            md.name, 
            md.email, 
            md.contact_no, 
            md.address, 
            md.status,
            u.role_id 
          FROM user u
          INNER JOIN manager m ON u.user_id = m.user_id
          INNER JOIN manager_detail md ON m.m_id = md.m_id
          WHERE u.role_id = 4 or u.role_id = 3 or u.role_id = 2`
      );

      console.log("Retrieved managers:", managers); // Debugging log
      // if (!managers.length) {
      //   return res.status(404).json({ message: "No managers found" });
      // }

      return res.status(200).json(managers);
    } catch (error) {
      console.error("Error retrieving managers:", error);
      return next(
        errorProvider(500, "An error occurred while retrieving managers")
      );
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error("Database connection error:", error);
    return next(errorProvider(500, "Failed to establish database connection"));
  }
};

export const getManagerById = async (req, res, next) => {
  const { user_id } = req.body;

  try {
    const conn = await pool.getConnection();
    try {
      const [manager] = await conn.execute(
        `SELECT 
            u.user_id, 
            u.user_name, 
            md.name, 
            md.email, 
            md.contact_no, 
            md.address, 
            md.status,
            u.role_id 
          FROM user u
          INNER JOIN manager m ON u.user_id = m.user_id
          INNER JOIN manager_detail md ON m.m_id = md.m_id
          WHERE u.user_id = ?`,
        [user_id]
      );

      console.log("Retrieved manager:", manager[0]); // Debugging log
      // if (!managers.length) {
      //   return res.status(404).json({ message: "No managers found" });
      // }

      return res.status(200).json(manager[0]);
    } catch (error) {
      console.error("Error retrieving managers:", error);
      return next(
        errorProvider(500, "An error occurred while retrieving managers")
      );
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error("Database connection error:", error);
    return next(errorProvider(500, "Failed to establish database connection"));
  }
};

export const updateStudent = async (req, res, next) => {
  try {
    const conn = await pool.getConnection();
    try {
      const { name, d_id, email, contact_no, address, status } = req.body;

      const s_id = 1;

      const [result] = await conn.execute(
        `UPDATE student_detail 
          SET 
            name = ?, 
            d_id = ?, 
            email = ?, 
            contact_no = ?, 
            address = ?, 
            status = ? 
          WHERE s_id = ?`,
        [name, d_id, email, contact_no, address, status, s_id]
      );

      if (result.length === 0) {
        return res
          .status(404)
          .json({ message: "Student not found or no changes made" });
      }

      return res.status(200).json({ message: "Student updated successfully" });
    } catch (error) {
      console.error("Error updating student:", error);
      return next(
        errorProvider(500, "An error occurred while updating the student")
      );
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error("Database connection error:", error);
    return next(errorProvider(500, "Failed to establish database connection"));
  }
};

export const updateManager = async (req, res, next) => {
  try {
    const conn = await pool.getConnection();
    try {
      const { name, email, contact_no, address, status } = req.body;

      const m_id = 1;

      const [result] = await conn.execute(
        `UPDATE manager_detail 
          SET 
            name = ?, 
            email = ?, 
            contact_no = ?, 
            address = ?, 
            status = ? 
          WHERE m_id = ?`,
        [name, email, contact_no, address, status, m_id]
      );

      if (result.length === 0) {
        return res
          .status(404)
          .json({ message: "Manager not found or no changes made" });
      }

      return res.status(200).json({ message: "Manager updated successfully" });
    } catch (error) {
      console.error("Error updating manager:", error);
      return next(
        errorProvider(500, "An error occurred while updating the manager")
      );
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error("Database connection error:", error);
    return next(errorProvider(500, "Failed to establish database connection"));
  }
};

export const getAllHods = async (req, res, next) => {
  try {
    const conn = await pool.getConnection();
    try {
      const [hods] = await conn.execute(
        `SELECT 
            u.user_id, 
            u.user_name, 
            md.name, 
            md.email, 
            md.contact_no, 
            md.address, 
            md.status 
          FROM user u
          INNER JOIN manager m ON u.user_id = m.user_id
          INNER JOIN manager_detail md ON m.m_id = md.m_id
          WHERE u.role_id = 3`
      );

      // for testing only
      console.log("Retrieved HODs:", hods);

      if (!hods.length) {
        return res.status(404).json({ message: "No HODs found" });
      }

      return res.status(200).json({ hods });
    } catch (error) {
      console.error("Error retrieving HODs:", error);
      return next(
        errorProvider(500, "An error occurred while retrieving HODs")
      );
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error("Database connection error:", error);
    return next(errorProvider(500, "Failed to establish database connection"));
  }
};

export const getAllDeans = async (req, res, next) => {
  try {
    const conn = await pool.getConnection();
    try {
      const [deans] = await conn.execute(
        `SELECT 
            u.user_id, 
            u.user_name, 
            md.name, 
            md.email, 
            md.contact_no, 
            md.address, 
            md.status 
          FROM user u
          INNER JOIN manager m ON u.user_id = m.user_id
          INNER JOIN manager_detail md ON m.m_id = md.m_id
          WHERE u.role_id = 2`
      );
      // for testing only
      console.log("Retrieved Deans:", deans);

      if (!deans.length) {
        return res.status(404).json({ message: "No Deans found" });
      }

      return res.status(200).json({ deans });
    } catch (error) {
      console.error("Error retrieving Deans:", error);
      return next(
        errorProvider(500, "An error occurred while retrieving Deans")
      );
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error("Database connection error:", error);
    return next(errorProvider(500, "Failed to establish database connection"));
  }
};
