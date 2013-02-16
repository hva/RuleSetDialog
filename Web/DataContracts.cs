using System;

namespace Web
{
	[Serializable]
	public class RuleSetContract
	{
		public string Chaining { get; set; }
		public RuleContract[] Rules { get; set; }
	}

	[Serializable]
	public class RuleContract
	{
		public string Name { get; set; }
	}
}