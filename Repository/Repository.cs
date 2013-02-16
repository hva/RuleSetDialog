using System.Workflow.Activities.Rules;
using System.Workflow.ComponentModel.Serialization;
using System.Xml;

namespace Repository
{
	public class FileRepository
	{
		public RuleSet Load(string filename) {
			using (XmlTextReader reader = new XmlTextReader(filename))
			{
				WorkflowMarkupSerializer serializer = new WorkflowMarkupSerializer();
				return serializer.Deserialize(reader) as RuleSet;
			}
		}

		public void Save(RuleSet ruleset, string filename) {
			using (XmlTextWriter writer = new XmlTextWriter(filename, null))
			{
				WorkflowMarkupSerializer serializer = new WorkflowMarkupSerializer();
				serializer.Serialize(writer, ruleset);
			}
		}
	}
}
