/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string

 *               email:
 *                 type: string
 *               password:
 *                 type: string

 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: All fields are required
 *       500:
 *         description: An error occurred while creating the user
 */

/**
 * @swagger
 * /user/signin:
 *   post:
 *     summary: signin a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User found and matched
 *       400:
 *         description: All fields are required
 *       401:
 *         description: Password is incorrect
 *       404:
 *         description: User not found /
 *       500:
 *         description: An error occurred while creating the user
 */

/**
 * @swagger
 * /user/logout:
 *   get:
 *     summary: Logout a user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: logged out successfully
 */

/**
 * @swagger
 * tags:
 *   name: Blog
 *   description: Blog Actions
 */
