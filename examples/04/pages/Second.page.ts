import { Page, Section } from '../../../src';
import { Vector2, vector2 } from '../../../src/math/Vector2';
import common from './sections/common';

class Second extends Page {
	private FONT_COLOR = '#ffffff';

	configurationSection(
		start: Vector2,
		data: Record<string, Record<string, string | Record<string, string>>>
	) {
		const section = new Section(this, start, vector2(2, 2));
		const INDENT = 5;
		let line = 0;

		const appendParameterText = (
			parameterKey: string,
			parameterValue: string,
			indent: number,
			underline = false
		) => {
			const parameterText = section.addText(
				`${parameterKey}: ${parameterValue}`,
				vector2(indent, line),
				{
					color: this.FONT_COLOR,
					underline,
				}
			);
			line += parameterText.size.Y;
		};

		Object.keys(data).forEach((dkey) => {
			const property = data[dkey];
			appendParameterText(dkey, '', 0, true);

			Object.keys(property).forEach((parameterKey) => {
				const parameter = property[parameterKey];
				if (typeof parameter === 'string') {
					appendParameterText(parameterKey, parameter, INDENT);
				} else if (typeof parameter === 'object') {
					appendParameterText(parameterKey, '', INDENT, true);

					Object.keys(parameter).forEach((subparameterKey) => {
						const subparameter = parameter[subparameterKey];
						appendParameterText(subparameterKey, subparameter, INDENT * 2);
					});
				}
			});
			line += INDENT;
		});

		section.fill();

		return section;
	}

	bootstrap(): void {
		this.setPadding(10, 10);

		const header = common.headerSection(this, '123');

		const exampleData = {
			RACK_MODEL: {
				id: 'mighty.squat.rack.sx-20',
				sku: 'KB04MI-004',
			},
			CONSTRUCTION: {
				color: {
					sku: 'KB04MI-004-08',
					name: 'yellow',
				},
				front: {
					sku: 'KB05MI-117',
					range: 'mighty',
					extension: 'super',
				},
				back: {
					sku: 'none',
					range: 'none',
					extension: 'none',
				},
			},
			BUMPER_STACKER: {
				name: 'mortarStacker',
				sku: 'KB05MI-009',
				size: '4',
			},
			SHELVES: {
				top: {
					sku: 'KB08MI-008',
					range: 'dumbbell',
				},
				middle: {
					sku: 'KB08MI-007',
					range: 'kettlebell',
				},
				bottom: {
					sku: 'KB08MI-009',
					range: 'sb',
				},
			},
			PULLUP_BAR: {
				sku: 'KB05MI-090',
				range: 'triangle',
			},
			EXTRA_EQUIPMENT: {
				JAMMER_ARMS: {
					sku: 'none',
					name: 'none',
				},
				SAFETY_ARMS: {
					sku: 'KB05MI-015',
					name: 'mightyAngelArms',
				},
				LEG_EXTENSION: {
					sku: 'KB05MI-099',
					name: 'mighty',
				},
				DIP_BAR: {
					sku: 'none',
					range: 'none',
					position: 'none',
				},
			},
		};

		const configuration = this.configurationSection(
			header.Position.add(0, header.Size.Y + 2),
			exampleData
		);

		this.Section(header);
		this.Section(configuration);
	}
}

export default Second;
