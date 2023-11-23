const getAllJobs = (req, res) => {
    res.json({ msg: 'all jobs'})
}

const getJob = (req, res) => {
    res.json({ msg: 'single job'})
}

const createJob = (req, res) => {
    res.json({ msg: 'create job'})
}

const updateJob = (req, res) => {
    res.json({ msg: 'update job'})
}

const deleteJob = (req, res) => {
    res.json({ msg: 'delete job'})
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}