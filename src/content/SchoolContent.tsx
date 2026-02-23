import React from 'react';
import { 
    View, ScrollView, ScrollViewProps 
} from "react-native";
import { ThemeProps } from '@/theme';
import { useAppStyle } from "@/constants";
import { 
    SchoolType, ImageType,
    SchedulesType, EventType
} from "@/types";
import { capitalize } from "@/utils";
import { 
    Widget,  BlockWidget, BlockWidgetProps  
} from '@/components/common/widgets';

import {
    SchoolCoordonnee, SchoolCoordonneeProps, 
    SchoolSchedule, SchoolScheduleProps,
    SchoolEvent, SchoolEventProps,
    SchoolSlider, SchoolSliderProps
} from "@/shared/school";

const MemoizedSchoolSlider = React.memo(SchoolSlider);

export type SchoolContentProps = {
    school: SchoolType;
    images: ImageType[];
    logo: ImageType | undefined;
    horaires: SchedulesType[];
    evenements: EventType[];
    theme: ThemeProps;
    scrollViewProps?: ScrollViewProps;
    navigation?: null;
}
const SchoolContent = ({
    school, images, logo,
    horaires, evenements, theme,
    scrollViewProps, navigation
}: SchoolContentProps) => {
    const ss = useAppStyle({ theme });
    const blockWidgetProps: BlockWidgetProps = {
        iconName: logo ? 'Logo' : 'Ionicons',
        source: logo?.url ?? 'school-sharp',
        text: capitalize(school?.nom || ""),
        color: theme.colors.primary,
    }
    const coordonneeProps: SchoolCoordonneeProps = {
        school: school
    }
    const scheduleProps: SchoolScheduleProps = {
        horaires: horaires
    }
    const eventProps: SchoolEventProps = {
        evenements: evenements
    }
    const sliderProps: SchoolSliderProps = {
        theme: theme,
        images: images,
        message: 'no_image'
    }

    return (
        <ScrollView {...scrollViewProps}>
            <Widget style={ss.container}>
                <View style={ss.schoolContent}>
                    <BlockWidget {...blockWidgetProps} />
                    <SchoolCoordonnee {...coordonneeProps} />
                    <SchoolSchedule {...scheduleProps} />
                    <SchoolEvent {...eventProps} />
                    <MemoizedSchoolSlider {...sliderProps} />
                </View>
            </Widget>
        </ScrollView>
    )
};

export default SchoolContent;