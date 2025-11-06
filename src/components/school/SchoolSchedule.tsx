import { Text } from "react-native";
import { Card } from "@/utils/card";
import { formaTimer } from "@/utils/helpers";
import { SchedulesType } from "@/utils/types";
import { TextCustom } from "@/utils/custom";

type SchoolScheduleProps = {
   horaires?: SchedulesType[];
};

export const SchoolSchedule = ({ horaires }: SchoolScheduleProps) => {
    return (
        <Card>
            <Card.Header>
                <Card.Title>Horaires de la semaine</Card.Title>
            </Card.Header>
            <Card.Body>
                {horaires && horaires?.length > 0 ? (
                    horaires.map((horaire: any, index: number) => (
                        <Card.Row key={index}>
                            <TextCustom type="caption" color="secondary">{horaire.jour} : </TextCustom>
                            {horaire.debut === '00:00:00' && horaire.fin === '00:00:00' ? (
                                <TextCustom type="caption" color="error">Fermé</TextCustom>
                            ) : (
                                <TextCustom type="caption">De {formaTimer(horaire.debut)} à {formaTimer(horaire.fin)}</TextCustom>
                          )}
                        </Card.Row>
                    ))
                ) : (
                    <Text>Aucun horaire disponible</Text>
                )}
            </Card.Body>
        </Card>
    );
};