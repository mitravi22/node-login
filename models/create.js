

module.exports= (sequelize, DataTypes) =>{
    const PatientVisit = sequelize.define("patient_visits",{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull : false,
            primaryKey: true,
        },
        registration_no: {
            type: DataTypes.INTEGER,
            allowNull : false,
        },
        visit_date: {
            type: DataTypes.STRING,
            allowNull : true,
        },
    },{
        timestamps: false
    });

    return PatientVisit
}