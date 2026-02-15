const Section = require('../models/Section');
const Course = require('../models/Course');
const SubSection = require('../models/SubSection');
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();
exports.createSubSection = async (req, res) => {
    try{
        //fetch data
         const {sectionId, title, description} = req.body;
         //extact file
         const video = req.files?.video;
         // validate (timeDuration is computed from uploaded video)
         if(!sectionId || !title || !description || !video){
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            });
         }

         //upload to cloundinary
         const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME)
          // create subsections
          const subSectionDetails = await SubSection.create({
            title,
            timeDuration: `${uploadDetails.duration}`,
            description,
            videoUrl:uploadDetails.secure_url
          });
          // update section
          const updatedSection = await Section.findByIdAndUpdate(sectionId, {
                                                                          $push: {
                                                                            subSection: subSectionDetails._id
                                                                          }  
                                                                        }, {new:true}).populate("subSection")
        return res.status(200).json({
            success:true,
            message:'Sub-Section created successfully',
            updatedSection
        })  
    }catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to create Sub-Section',
            error: error.message,
        })
    }
}

exports.updateSubSection = async (req, res) => {
    try {
      const { sectionId,subSectionId, title, description } = req.body
      const subSection = await SubSection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()
  
      const updatedSection = await Section.findById(sectionId).populate("subSection")


      return res.json({
        success: true,
        data:updatedSection,
        message: "Section updated successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }

exports.deleteSubSection = async (req,res) =>{
    try {
        
        const {subSectionId,sectionId } = req.body;
        await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
              $pull: {
                subSection: subSectionId,
              },
            }
          )

        if(!subSectionId) {
            return res.status(400).json({
                success:false,
                message:'SubSection Id to be deleted is required',
            });
        }

        
        const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }

      const updatedSection = await Section.findById(sectionId).populate("subSection")
  
      return res.json({
        success: true,
        data:updatedSection,
        message: "SubSection deleted successfully",
      })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to delete SubSection',
            error: error.message,
        })
    }
}