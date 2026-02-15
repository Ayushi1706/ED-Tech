const Section = require('../models/Section');
const Course = require('../models/Course');
const SubSection = require('../models/SubSection');

exports.createSection = async (req, res) => {
    try{
        //fetch data
         const {courseId, sectionName} = req.body;
         // validate
         if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            });
         }
          // create sections
          const newSection = await Section.create({sectionName});
          // update Course 
          const updatedCourse = await Course.findByIdAndUpdate(courseId, {
                                                                          $push: {
                                                                            courseContent:newSection._id
                                                                          }  
                                                                        }, {new:true})
                                                                        .populate({
                                                                            path:"courseContent",
                                                                            populate: {
                                                                                path:"subSection"
                                                                            }});
        return res.status(200).json({
            success:true,
            message:'Section created successfully',
            newSection,
            updatedCourse
        })  
    }catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to create Section',
            error: error.message,
        })
    }
}



exports.updateSection = async (req, res) => {
    try{
        const {sectionName,sectionId} = req.body;
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            });
         }

        const updatedSection = await Section.findByIdAndUpdate(
  sectionId,
  { sectionName },
  { new: true }
);

return res.status(200).json({
  success: true,
  message: 'Section updated successfully',
  updatedSection
});

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to update Section',
            error: error.message,
        })
    }
}


exports.deleteSection = async (req, res) => {
    try{
        const {sectionId,courseId} = req.body;
        if (!sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "SectionId and CourseId are required",
      });
    }

        await Section.findByIdAndDelete(sectionId);
        // Remove section reference from course
    await Course.findByIdAndUpdate(courseId, {
      $pull: { courseContent: sectionId },
    });
        return res.status(200).json({
            success:true,
            message:'Section delete successfully',
        }) 
    }catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to delete Section',
            error: error.message,
        })
    }
}