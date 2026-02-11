import { createArtifactService } from "../services/artifactservices.js";

export const createArtifact = async (req, res) => {
    try {
        const artifact = await createArtifactService({
            title: req.body.title,
            content: req.body.content,
            userId: req.user.id,
            // file: req.file ? req.file.filename : null
            filePath: req.file ? req.file.path : null
        });
        res.status(201).json({
            success: true,
            message: "Artifact created successfully",
            artifact
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const getArtifacts = async (req, res) => {
  try {
    const artifacts = await getArtifactsService({
      userId: req.user.id,
      role: req.user.role
    });

    res.status(200).json({
      success: true,
      artifacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};