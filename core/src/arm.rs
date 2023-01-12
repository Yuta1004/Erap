#[derive(Debug, Default)]
pub struct ArmEndpoint {
    x: f32,
    y: f32,
    theta: f32      // degree
}

impl ArmEndpoint {
    pub fn calc_next_endpoint(&self, next_arm: &Arm) -> ArmEndpoint {
        let theta = self.theta + next_arm.theta;
        let rtheta = theta.to_radians();
        ArmEndpoint {
            x: self.x + f32::cos(rtheta) * next_arm.length,
            y: self.y + f32::sin(rtheta) * next_arm.length,
            theta
        }
    }
}

#[derive(Debug, Default)]
pub struct Arm {
    length: f32,
    theta: f32      // degree
}

impl Arm {
    pub fn new(length: f32, theta: f32) -> Arm {
        Arm { length, theta }
    }

    pub fn calc_endpoint(&self, base: &ArmEndpoint) -> ArmEndpoint {
        base.calc_next_endpoint(self)
    }
}

#[cfg(test)]
mod test {
    use crate::arm::ArmEndpoint;

    use super::Arm;

    #[test]
    fn new_arm() {
        let arm = Arm::default();
        assert_eq!(arm.length, 0.0);
        assert_eq!(arm.theta, 0.0);
    }

    #[test]
    fn single_arm() {
        let arm = Arm::new(10.0, 0.0);
        let endpos = arm.calc_endpoint(&ArmEndpoint::default());
        assert_eq!(endpos.x, 10.0);
        assert_eq!(endpos.y, 0.0);
        assert_eq!(endpos.theta, 0.0);
    }

    #[test]
    fn multiple_arms() {
        let arms = vec![
            Arm::new(10.0, 10.0),
            Arm::new(10.0, 40.0),
            Arm::new(15.0, 70.0),
            Arm::new(15.0, -70.0),
            Arm::new(10.0, -40.0),
            Arm::new(10.0, -10.0)
        ];

        let mut endpoint = ArmEndpoint::default();
        for arm in arms {
            endpoint = arm.calc_endpoint(&endpoint);
            println!("{:?}", endpoint);
        }

        assert!((38.265846 - endpoint.x) < f32::EPSILON);
        assert!((35.614452 - endpoint.y) < f32::EPSILON);
        assert_eq!(endpoint.theta, 0.0);
    }
}
